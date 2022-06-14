import styled from 'styled-components';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button as BaseButton, Input, InputNumber } from 'antd';
import axios from 'axios';
import useSWR from 'swr';
import { ItemPriceMax, ItemTitleMaxLength } from '../contants';
import { validatePutData } from '../common/validate';

const ItemCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbcbcb;
`;

const ItemId = styled.h3`
  text-transform: uppercase;
  font-size: 0.7rem;
  margin-bottom: 17px;
  padding-bottom: 3px;
  border-bottom: 1px solid #cbcbcb;
`;

const UpdatedAt = styled.h4`
  font-size: 0.7rem;
  margin-bottom: 0;
`;

const ItemName = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
`;
const ItemPrice = styled.h3`
  font-size: 1rem;
`;

const Button = styled(BaseButton).attrs({ size: 'small' })`
  border: 1px solid #cbcbcb;
  background: #1fc76a;
  border-radius: 3px;
  margin-right: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #cbcbcb;
  padding-bottom: 10px;
  margin-bottom: 5px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > *:not(:last-child) {
    margin-bottom: 7px;
  }
`;

const ItemDataContainer = styled.div`
  margin-bottom: 10px;
`;

const ItemUpdatedTimeContainer = styled.div`
  display: flex;
`;

const ItemCard = ({ item }) => {
  const [deletePromptOpen, setDeletePromptOpen] = useState(false);
  const [validateErrors, setValidateErrors] = useState(null);
  const [updateItemData, setUpdateItemData] = useState({
    id: item.id,
    name: item.name,
    price: item.price
  });
  const [isUpdatingItem, setIsUpdatingItem] = useState(false);
  const { mutate } = useSWR('http://localhost:80/items');

  const handleUpdateItem = async () => {
    if (!isUpdatingItem) {
      setIsUpdatingItem(true);
      return;
    }
    const validatedPutData = await validatePutData(updateItemData);
    setValidateErrors(validatedPutData);
    if (!validateErrors) {
      await axios.put('http://localhost:80/items', updateItemData);
    }
    mutate();
    setIsUpdatingItem(false);
  };

  const handleDeleteItem = async () => {
    if (!deletePromptOpen) {
      setDeletePromptOpen(true);
      return;
    }
    await axios.delete('http://localhost:80/items', { data: { id: item.id } });
    mutate();
    setDeletePromptOpen(false);
  };

  const handleUpdateItemDataChange = (itemProperty, value) => {
    setUpdateItemData({ ...updateItemData, [itemProperty]: value });
    setValidateErrors(null);
  };

  return (
    <ItemCardContainer onMouseLeave={() => setDeletePromptOpen(false)} key={item.id}>
      <ItemId>{item.id}</ItemId>
      <ItemDataContainer>
        {isUpdatingItem ? (
          <InputContainer>
            {validateErrors && (
              <Alert closable={true} message={validateErrors.message} type="error" />
            )}
            <Input
              maxLength={ItemTitleMaxLength}
              defaultValue={item.name}
              onChange={(e) => handleUpdateItemDataChange('name', e.target.value)}
              placeholder="Name"
            />
            <InputNumber
              step={10}
              min={0}
              defaultValue={item.price}
              max={ItemPriceMax}
              onChange={(value) => handleUpdateItemDataChange('price', value)}
              placeholder="Price"
            />
          </InputContainer>
        ) : (
          <>
            <ItemName>{item.name}</ItemName>
            <ItemPrice>{`$${item.price.toLocaleString()}`}</ItemPrice>
          </>
        )}
      </ItemDataContainer>
      <ButtonContainer>
        {!deletePromptOpen && (
          <Button onClick={() => handleUpdateItem()} type="primary">
            Update Item
          </Button>
        )}
        {isUpdatingItem ? (
          <Button
            onClick={() => {
              setIsUpdatingItem(false);
            }}
            type="primary"
            danger>
            {'Cancel'}
          </Button>
        ) : (
          <Button
            onClick={() => {
              handleDeleteItem();
            }}
            type="primary"
            danger>
            {deletePromptOpen ? 'Confirm' : 'Delete Item'}
          </Button>
        )}
      </ButtonContainer>
      <ItemUpdatedTimeContainer>
        <UpdatedAt>{`Updated at: ${new Date(item.updatedAt).toLocaleDateString([])}`}</UpdatedAt>
      </ItemUpdatedTimeContainer>
    </ItemCardContainer>
  );
};

ItemCard.propTypes = {
  item: PropTypes.object
};

export default ItemCard;
