import { useRouter } from "next/router";
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/products";


export default function Products() {
    const { query } = useRouter();
    console.log(query);
    return (
        <ProductContainer>
            <ImageContainer></ImageContainer>
            <ProductDetails>
                <h1>shirt one</h1>
                <span>R$ 79,90</span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quas iste incidunt neque facere odio, officia consequuntur numquam quo repellendus hic eum, ut suscipit architecto eaque deleniti rem illum modi!</p>
                <button>Comprar agora</button>
            </ProductDetails>
        </ProductContainer>
    );
}