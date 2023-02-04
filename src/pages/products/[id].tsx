import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/products";

interface ProductProps {
    product: {
      id: string,
      name: string,
      description: string,
      imageUrl: string,
      price: number,
      defaultPriceId: string
    }
  }

export default function Products({ product }: ProductProps) {
    const [ isCreatingCheckoutSession, setIsCreatingCheckoutSession ] = useState(false)

    async function handleBuyProduct() {
        try {
            setIsCreatingCheckoutSession(true)
            const response = await
             axios.post('/api/checkout',{
                priceId: product.defaultPriceId
            })
            const { checkoutUrl } = response.data;

            window.location.href = checkoutUrl;
        } catch (error) {
            setIsCreatingCheckoutSession(false)

        }
    }

    return (
        <>
            <Head><title>{product.name} | NTN Shop</title></Head>

            <ProductContainer>
                <ImageContainer>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
                </ImageContainer>
                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>
                    <p>{product.description}</p>
                    <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>Comprar agora</button>
                </ProductDetails>
            </ProductContainer>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    });

    const price = product.default_price as Stripe.Price
    console.log(product)
    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                description: product.description,
                price: new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(price.unit_amount / 100),
                defaultPriceId: price.id          
              }
        },
        revalidate: 60 * 60
    }
}