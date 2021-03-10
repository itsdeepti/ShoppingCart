export interface Product {
    id?: string;
    key: string;
    data: {
        title: string;
        price: number;
        category: string;
        imageUrl: string;
    }
}