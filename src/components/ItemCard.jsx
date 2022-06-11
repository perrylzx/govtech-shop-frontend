import styled from 'styled-components';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button as BaseButton } from 'antd';
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

const ItemCard = ({ item }) => {
  const [deletePromptOpen, setDeletePromptOpen] = useState(false);
  const { mutate } = useSWR('http://localhost:80/items');

  const handleDeleteItem = async () => {
    if (!deletePromptOpen) {
      setDeletePromptOpen(true);
      return;
    }
    await axios.delete('http://localhost:80/items', { data: { id: item.id } });
    mutate();
    setDeletePromptOpen(false);
  };

  return (
    <ItemCardContainer onMouseLeave={() => setDeletePromptOpen(false)} key={item.id}>
      <ItemId>{item.id}</ItemId>
      <ItemName>{item.name}</ItemName>
      <ItemPrice>{`$${item.price.toLocaleString()}`}</ItemPrice>
      <ButtonContainer>
        {!deletePromptOpen && <Button type="primary">Update Item</Button>}
        <Button
          onClick={() => {
            handleDeleteItem();
          }}
          type="primary"
          danger>
          {deletePromptOpen ? 'Confirm' : 'Delete Item'}
        </Button>
      </ButtonContainer>
    </ItemCardContainer>
  );
};

ItemCard.propTypes = {
  item: PropTypes.object
};

export default ItemCard;
