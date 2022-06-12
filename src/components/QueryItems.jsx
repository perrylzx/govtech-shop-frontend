import { includes, slice, omit } from 'lodash';
import { LeftOutlined } from '@ant-design/icons';
import PriceFilter from '../components/PriceFilter';
import styled from 'styled-components';
import { Input as BaseInput, Button as BaseButton } from 'antd';
import { useState } from 'react';
import { FilterComponents } from '../common/enums';
import PropTypes from 'prop-types';

const QueryItemsContainer = styled.div`
  background: white;
  border-radius: 13px;
  margin-bottom: 64px;
  padding: 26px;
`;
const Input = styled(BaseInput)`
  margin-bottom: 10px;
`;

const { Search } = Input;

const SearchStyled = styled(Search)`
  margin-bottom: 20px;
`;

const FilterItemsContainer = styled.div`
  display: flex;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled(BaseButton)`
  border: 0;
  border-radius: 8px;
  margin-bottom: 28px;
`;

const QueryItems = ({ mutate, filterData, setFilterData }) => {
  const [filterItems, setFilterItems] = useState([]);

  return (
    <QueryItemsContainer>
      <h2>Search Items</h2>
      <SearchStyled
        onChange={(e) => setFilterData({ ...filterData, name: e.target.value })}
        placeholder="Search Item"
        value={filterData.name}
        onSearch={() => mutate()}
        enterButton
        size="large"
      />
      {filterItems && (
        <FilterItemsContainer>
          {filterItems.map((filterItem, index) => {
            return (
              <>
                {filterItem === FilterComponents.PriceFilter && (
                  <FilterContainer>
                    <PriceFilter filterData={filterData} setFilterData={setFilterData} />
                    <LeftOutlined
                      onClick={() => {
                        setFilterData(omit(filterData, ['minAmount', 'maxAmount']));
                        const removeFilter = slice(filterItems, index, index);
                        setFilterItems(removeFilter);
                      }}
                    />
                  </FilterContainer>
                )}
              </>
            );
          })}
        </FilterItemsContainer>
      )}
      <h3>Filter by...</h3>
      <div>
        {Object.values(FilterComponents).map((filterComponent) => {
          const filterComponentIsRendered = includes(filterItems, filterComponent);
          if (filterComponentIsRendered) {
            return;
          }
          return (
            <>
              <Button
                style={{ marginRight: '10px' }}
                key={filterComponent}
                onClick={() => setFilterItems([...filterItems, FilterComponents.PriceFilter])}
                type="primary"
                size="large">
                Price
              </Button>
              <Button
                onClick={async () => {
                  await setFilterData({});
                  mutate();
                }}
                type="primary"
                danger
                size="large">
                Clear queries
              </Button>
            </>
          );
        })}
      </div>
    </QueryItemsContainer>
  );
};

QueryItems.propTypes = {
  mutate: PropTypes.function,
  filterData: PropTypes.object,
  setFilterData: PropTypes.function
};

export default QueryItems;
