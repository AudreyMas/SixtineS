import React from 'react';

const ListItem = ({ listType, data, product, index }) => {
    let ChosenList;

    switch (listType) {
        case 'selectShop':
            ChosenList = () => (
                <li> 
                    <p>{product.id}</p>
                    <p>{product.name_shop}</p>
                    <p>{product.company_name}</p>
                    <p>{product.phone}</p>
                    <p>{product.language}</p>
                    <p>{product.Sales_id}</p>
                </li>
            )
            break;
        case 'billNotPaid':
            ChosenList = () => (
                <li> 
                    <p>{product.name_shop}</p>
                    <p>{product.orders_id}</p>
                    <p>{product.price_total}</p>
                </li>
            )
            break;
        case 'shopRecall':
            ChosenList = () => (
                <li> 
                    <p>{product.name_shop}</p>
                    <p>{product.date}</p>
                </li>
            )
            break;
        case 'resumeOrder':
        let addition=0;
        if(data.quantity_xs!==undefined){
            addition+= data.quantity_xs;
        }
        if(data.quantity_s !==undefined){
            addition+=data.quantity_s;
        }
        if(data.quantity_m !==undefined){
            addition+=data.quantity_m;
        }
        if(data.quantity_l !==undefined){
            addition+=data.quantity_l;
        }
        if(data.quantity_xl !==undefined){
            addition+=data.quantity_xl;
        }
        if(data.quantity_xxl !==undefined){
            addition+=data.quantity_xxl;
        }
        
            ChosenList = () => (
                <li> 
                    <img className="img-hidden" src={data.image_1} alt={data.name} />
                    <p className="name-product"><span>Name shop : </span>{data.name}</p>
                    <p className="taille"><span>XS : </span><b>{data.quantity_xs}</b></p>
                    <p className="taille"><span>S : </span><b>{data.quantity_s}</b></p>
                    <p className="taille"><span>M : </span><b>{data.quantity_m}</b></p>
                    <p className="taille"><span>L : </span><b>{data.quantity_l}</b></p>
                    <p className="taille"><span>XL : </span><b>{data.quantity_xl}</b></p>
                    <p className="taille"><span>XXL : </span><b>{data.quantity_xxl}</b></p>
                    <p className="taille" ><span>Color : </span>{data.color} / </p>
                    <p className="price"><span>Price : </span><b>{data.price * addition} €</b></p>
                </li>
            )
            break;
        case 'StockManagement':
            ChosenList = () => (
                <li className="culums_title">
                    <p>{data.type}</p>
                    <p>{data.name}</p>
                    <p>{data.seasons_id}</p>
                    <p>{data.EAN}</p>
                    <input type="text" name="fname" placeholder={data.quantity}></input>
                    <input type="text" name="fname" placeholder={data.quantity}></input>
                    <input type="text" name="fname" placeholder={data.quantity}></input>
                    <input type="text" name="fname" placeholder={data.quantity}></input>
                    <input type="text" name="fname" placeholder={data.quantity}></input>
                    <input type="text" name="fname" placeholder={data.quantity}></input>
                    
                    
                </li>
            )
            break;
        default:
            ChosenList = () => (
                <p>Please provide a correct ListType</p>
            )

            break;
    }
    return (
        <ChosenList />
    )

};

export default ListItem;