import styled from 'styled-components';
import PropTypes from 'prop-types';
import ItemCard from './ItemCard';

const ItemListContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  row-gap: 25px;
  column-gap: 25px;
`;

const ItemCount = styled.h3``;

const ItemList = ({ items, itemCount }) => {
  return (
    <>
      <ItemCount>{`${itemCount} items`}</ItemCount>
      <ItemListContainer>
        {items.map((item) => {
          if (!item.name) {
            return;
          }
          return <ItemCard key={item.id} item={item} />;
        })}
      </ItemListContainer>
    </>
  );
};

ItemList.propTypes = {
  items: PropTypes.array,
  itemCount: PropTypes.integer
};

export default ItemList;
