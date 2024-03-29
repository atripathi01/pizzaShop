export type VegType = "Veg" | "Non-Veg" ;
export type PizzaSize = "Small" | "Medium" | "Large" ;
export type PizzaBase = "Thin" | "Thick" ;
export type PizzaStage = "Order Placed" | "Order Making" | "Order Ready" | "Order Picked" | "Cancelled";

export interface Pizza {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    pizzaType: VegType;
    size: PizzaSize;
    base: PizzaBase;
    stage:PizzaStage;
    orderId?:number;
}