import styled from 'styled-components';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button as BaseButton, Input, InputNumber } from 'antd';
import axios from 'axios';
import useSWR from 'swr';

const ItemCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background: white;
  border-radius: 8px;
`;

const ItemId = styled.h3`
  font-size: 9px;
  margin-bottom: 17px;
`;

const ItemName = styled.h3`
  font-size: 14px;
`;
const ItemPrice = styled.h3`
  font-size: 14px;
`;

const Button = styled(BaseButton).attrs({ size: 'small' })`
  border: 0;
  background: #1fc76a;
  border-radius: 3px;
  margin-right: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > input:first-child {
    margin-bottom: 7px;
  }
`;

const ItemDataContainer = styled.div`
  margin-bottom: 10px;
`;

const ItemCard = ({ item }) => {
  const [deletePromptOpen, setDeletePromptOpen] = useState(false);
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
    await axios.put('http://localhost:80/items', updateItemData);
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
  };

  return (
    <ItemCardContainer onMouseLeave={() => setDeletePromptOpen(false)} key={item.id}>
      <ItemId>{item.id}</ItemId>
      <ItemDataContainer>
        {isUpdatingItem ? (
          <InputContainer>
            <Input
              defaultValue={item.name}
              onChange={(e) => handleUpdateItemDataChange('name', e.target.value)}
              placeholder="Name"
            />
            <InputNumber
              step={10}
              min={0}
              defaultValue={item.price}
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
    </ItemCardContainer>
  );
};

ItemCard.propTypes = {
  item: PropTypes.object
};

export default ItemCard;
