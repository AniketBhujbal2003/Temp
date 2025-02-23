import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";

import ProductCard from "../components/cards/ProductCard";
import { getFavourite } from "../api";
import { demoProducts } from "../utils/data";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 12px;
  }
  background: ${({ theme }) => theme.bg};
  // background: yellow;
`;
const Section = styled.div`
  max-width: 1400px;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  // background: pink;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  display: flex;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: center;
  //  background: green;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  @media (max-width: 750px) {
    gap: 14px;
  }
  // background: green;
`;

const Favourite = () => {

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([...demoProducts]);
  const [reload, setReload] = useState(false);

  const getProducts = async () => {
    setLoading(false); // true
    const token = localStorage.getItem("krist-app-token");
    await getFavourite(token).then((res) => {
      setProducts(res.data);
      setLoading(false);
      setReload(!reload);
    });
  };

  // useEffect(() => {
  //   getProducts();
  // }, []);

  return (
    <Container>
      <Section>
        <Title center>Your favourites</Title>
        <CardWrapper>
          {false ? ( // loading
            <CircularProgress />
          ) : (
            <>
              {products.length === 0 ? (
                <>No Products</>
              ) : (
                <CardWrapper>
                  {products.map((product) => (
                    <ProductCard product={product} />
                  ))}
                </CardWrapper>
              )}
            </>
          )}
        </CardWrapper>
      </Section>
    </Container>
  );
};

export default Favourite;