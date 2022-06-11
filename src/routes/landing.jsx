import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import ItemList from '../components/ItemList';

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

const Landing = () => {
  const [items, setItems] = useState([]);

  useEffect(function getItems() {
    axios('http://localhost:80/items').then((res) => {
      setItems(res?.data);
    });
  }, []);

  return (
    <>
      <BackgroundBanner />
      <ShopContentContainer>
        <YourShop>Your shop</YourShop>
        {!isEmpty(items) && <ItemList items={items} />}
      </ShopContentContainer>
    </>
  );
};

export default Landing;
