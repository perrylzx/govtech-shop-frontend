import { InputNumber } from 'antd';
import { ItemPriceMax } from '../contants';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PriceInputContainer = styled.div`
  display: flex;
  margin-right: 10px;
  align-items: center;
  & > div:first-child {
    margin-right: 10px;
  }
`;

const InputPrefixText = styled.span`
  margin-right: 10px;
`;

const PriceFilter = ({ setFilterData, filterData }) => {
  return (
    <PriceInputContainer>
      <div>
        <InputPrefixText>Minimum Price:</InputPrefixText>
        <InputNumber
          step={10}
          max={filterData.maxAmount}
          value={filterData.minAmount}
          min={0}
          onChange={(e) => {
            setFilterData({ ...filterData, minAmount: e });
          }}
          placeholder="$0"
        />
      </div>
      <div>
        <InputPrefixText>Maximum Price:</InputPrefixText>
        <InputNumber
          step={10}
          max={ItemPriceMax}
          value={filterData.maxAmount}
          min={filterData.minAmount || 0}
          onChange={(e) => {
            setFilterData({ ...filterData, maxAmount: e });
          }}
          placeholder="$100"
        />
      </div>
    </PriceInputContainer>
  );
};

PriceFilter.propTypes = {
  setFilterData: PropTypes.func,
  filterData: PropTypes.object
};

export default PriceFilter;
