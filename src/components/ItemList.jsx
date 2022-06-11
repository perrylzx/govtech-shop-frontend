import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button as BaseButton } from 'antd';

const ItemListContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  row-gap: 25px;
  column-gap: 25px;
`;
const ItemCard = styled.div`
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

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled(BaseButton).attrs({ size: 'small' })`
  border: 0;
  background: #1fc76a;
  border-radius: 3px;
  margin-right: 5px;
`;

const ItemList = ({ items }) => {
  return (
    <ItemListContainer>
      {items.map((item) => {
        if (!item.price || !item.name) {
          return;
        }
        return (
          <ItemCard key={item.id}>
            <ItemId>{item.id}</ItemId>
            <ItemName>{item.name}</ItemName>
            <ItemPrice>{`$${item.price.toLocaleString()}`}</ItemPrice>
            <ButtonContainer>
              <Button type="primary">Update Item</Button>
              <Button type="primary" danger>
                Delete Item
              </Button>
            </ButtonContainer>
          </ItemCard>
        );
      })}
    </ItemListContainer>
  );
};

ItemList.propTypes = {
  items: PropTypes.array
};

export default ItemList;
