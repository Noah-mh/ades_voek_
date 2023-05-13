import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "../../api/axios";
import Loading from "../Loading/Loading"
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import './ProductDetailsWithReviews.css';

const cld = new Cloudinary({
    cloud: {
        cloudName: "dgheg6ml5",
    },
});

interface ProductVariation {
    variation_1: string | null;
    variation_2: string | null;
}

interface Review {
    rating: number;
    image_urls: string[];
    reviews: Customer[];
}
interface Customer {
    customerName: string;
    comment: string;
}
interface Product {
    image_urls: string[] | null;
    name: string;
    description: string | null;
    variations: string | null;
}


const ProductDetailWithReview: React.FC = () => {
    const params = useParams();
    const { product_id } = params;
    const [productData, setProductData] = useState<Product | null>(null);
    const [productReview, setProductReview] = useState<Review | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get(`/productDetailsWithoutReviews/${product_id}`)
            .then((response) => {
                setProductData(response.data);
                return axios.get(`/productReviews/${product_id}`);
            })
            .then((response) => {
                setProductReview(response.data);

            })//.then(() => {
            //     console.log(productData);
            //     console.log(productReview);
            // })
            .catch((error) => {
                console.error(error);
                setIsLoading(true); // And here, if there's an error
            });
    }, [product_id]);


    useEffect(() => {
        if (productData && productReview) {
            setIsLoading(false);
            console.log(productData);
            console.log(productReview);
        }
    }, [productData, productReview]);


    if (isLoading || !productData || !productReview) {
        return <Loading />;
    }

    return (
        <div className="container">
            <h1>{productData.name}</h1>
            {(productData.image_urls || []).map((image_url, index) => (
                <div className="image-container" key={index}>
                    <AdvancedImage cldImg={cld.image(image_url)} />
                </div>
            ))}
            <p>{productData.description}</p>

            <h3>Variations:</h3>
            {JSON.parse(productData.variations || '[]').map((variation: ProductVariation, index: number) => (
                <div className="variation" key={index}>
                    <p>{variation.variation_1}</p>
                    <p>{variation.variation_2}</p>
                </div>
            ))}

            <h3>Rating: {productReview.rating}</h3>

            <h3>Reviews:</h3>
            {(productReview.image_urls || []).map((image_url, index) => (
                <div className="image-container" key={index}>
                    <AdvancedImage cldImg={cld.image(image_url)} />
                </div>
            ))}

            {(productReview.reviews || []).map((review, index) => (
                <div className="review" key={index}>
                    <h4>{review.customerName}</h4>
                    <p>{review.comment}</p>
                </div>
            ))}
        </div>
    );

};

export default ProductDetailWithReview;