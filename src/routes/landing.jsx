import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import ItemList from '../components/ItemList';
import { Input as BaseInput, Button as BaseButton, Modal, InputNumber, Spin } from 'antd';
import useSWR from 'swr';
import 'antd/dist/antd.css';

const BackgroundBanner = styled.div`
  background: #1fc76a;
  position: absolute;
  width: 100%;
  height: 300px;
  z-index: -1;
  h1 {
    position: absolute;
  }
`;

const ShopContentContainer = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 150px 0 0 0;
`;

const YourShop = styled.h1`
  color: white;
`;

const SearchAndPostItemContainer = styled.div`
  background: white;
  height: 235px;
  border-radius: 13px;
  margin-bottom: 64px;
  padding: 26px;
`;

const Button = styled(BaseButton)`
  border: 0;
  border-radius: 8px;
  margin-bottom: 28px;
`;

const Input = styled(BaseInput)`
  margin-bottom: 10px;
`;

const fetcher = async (key) => {
  return axios(key);
};

const Landing = () => {
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [postItemModalOpen, setPostItemModalOpen] = useState(false);
  const [postItemData, setPostItemData] = useState({ name: '', price: 0 });
  const { data, mutate, isValidating } = useSWR('http://localhost:80/items', fetcher);

  const { Search } = Input;

  useEffect(() => {
    if (data) {
      const { items, itemCount } = data.data;
      setItemCount(itemCount);
      setItems(items);
    }
  }, [data]);

  const handlePostItemDataChange = (dataName, value) => {
    setPostItemData({ ...postItemData, [dataName]: value });
  };

  const handleOnPostItemClick = async () => {
    await axios.post('http://localhost:80/items', postItemData);
  };

  return (
    <>
      <Modal
        okText="Post"
        title="Post Item"
        visible={postItemModalOpen}
        onOk={async () => {
          await handleOnPostItemClick();
          setPostItemModalOpen(false);
          mutate();
        }}
        onCancel={() => setPostItemModalOpen(false)}>
        <h4>Name:</h4>
        <Input
          value={postItemData.name}
          onChange={(e) => handlePostItemDataChange('name', e.target.value)}
          placeholder="Name"
        />
        <h4>Price:</h4>
        <InputNumber
          step={10}
          min={0}
          value={postItemData.price}
          onChange={(e) => handlePostItemDataChange('price', e)}
          placeholder="Price"
        />
      </Modal>
      <BackgroundBanner />
      <ShopContentContainer>
        <>
          <YourShop>Your shop</YourShop>
          <SearchAndPostItemContainer>
            <Button onClick={() => setPostItemModalOpen(true)} type="primary" size="large">
              Post Item
            </Button>
            {isValidating && <Spin />}
            <Search placeholder="Search Item" allowClear enterButton size="large" />
          </SearchAndPostItemContainer>
          {!isEmpty(items) && <ItemList items={items} />}
        </>
      </ShopContentContainer>
    </>
  );
};

export default Landing;
