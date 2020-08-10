import React from 'react';
import './style.scss';
import moment from 'moment';
import CountryData from "country-data";

const ProductComponent = ({
    data
}) => {
    if (data) {
        return (
            <>
                <div className="products-view-container">
                    <h2 className="markdown-header">Purchase Information #{data.id}</h2>
                    <div className="products-view-container-item">
                        <div className="general-information-item-content">
                            <h3 className="markdown-header">General Inforamtion</h3>
                            <div className="general-information-table-container">
                                {
                                    !data.user && (
                                        <>
                                            <div className="general-information-col">
                                                <p className="information-tab">Full Name</p>
                                                <p>{data.baseFirstName} {data.baseLastName}</p>
                                            </div>
                                            <div className="general-information-col">
                                                <p className="information-tab">Email</p>
                                                <p>{data.baseEmail}</p>
                                            </div>
                                            <div className="general-information-col">
                                                <p className="information-tab">Phone</p>
                                                <p>{data.basePhone}</p>
                                            </div>
                                        </>
                                    )
                                }
                                <div className="general-information-col">
                                    <p className="information-tab">Type</p>
                                    <p>{data.type}</p>
                                </div>
                                <div className="general-information-col">
                                    <p className="information-tab">Member</p>
                                    <p>{data.userId ? 'yes' : 'no'}</p>
                                </div>
                                <div className="general-information-col">
                                    <p className="information-tab">Created At</p>
                                    <p>{moment(data.createdAt).format('DD.MM.YYYY HH:mm')}</p>
                                </div>
                                <div className="general-information-col">
                                    <p className="information-tab">Quantity</p>
                                    <p>{data.quantity}</p>
                                </div>
                                <div className="general-information-col">
                                    <p className="information-tab">Stripe Charge Id</p>
                                    <p>{data.stripeChargeId}</p>
                                </div>
                                <div className="general-information-col">
                                    <p className="information-tab">Total Amount</p>
                                    <p>${parseFloat((data.totalAmount || 0) / 100).toFixed(2)}</p>
                                </div>
                                <div className="general-information-col">
                                    <p className="information-tab">From Date</p>
                                    <p>{data.fromDate}</p>
                                </div>
                                <div className="general-information-col">
                                    <p className="information-tab">To Date</p>
                                    <p>{data.toDate}</p>
                                </div>
                            </div>
                        </div>
                        {
                            (data.product && Object.values(data.product).length > 0) && (
                                <div className="general-information-item-content">
                                    <h3 className="markdown-header">Product Inforamtion</h3>
                                    <div className="general-information-table-container">
                                        <div className="general-information-col">
                                            <p className="information-tab">Type</p>
                                            <p>{data.product.type}</p>
                                        </div>
                                        <div className="general-information-col">
                                            <p className="information-tab">Name</p>
                                            <p>{data.product.name}</p>
                                        </div>
                                        <div className="general-information-col">
                                            <p className="information-tab">Member Price</p>
                                            <p>${(data.product.memberPrice / 100).toFixed(2)}</p>
                                        </div>
                                        <div className="general-information-col">
                                            <p className="information-tab">Price</p>
                                            <p>${(data.product.price / 100).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    {
                                        (data.supplier && Object.values(data.supplier).length > 0) && (
                                            <>
                                                <h3 className="markdown-header mt-3">Supplier Inforamtion</h3>
                                                <div className="general-information-table-container">
                                                    <div className="general-information-col">
                                                        <p className="information-tab">Name</p>
                                                        <p>{data.supplier.name}</p>
                                                    </div>
                                                    {
                                                        data.supplier.logo && (
                                                            <div className="general-information-col">
                                                                <p className="information-tab">Logo</p>
                                                                <p><img src={data.supplier.logo} alt={data.supplier.logo} /></p>
                                                            </div>
                                                        )
                                                    }
                                                    <div className="general-information-col">
                                                        <p className="information-tab">Email</p>
                                                        <p>{data.supplier.email}</p>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            )
                        }
                        {
                            (data.user && Object.values(data.user).length > 0) && (
                                <div className="general-information-item-content mt-3">
                                    <h3 className="markdown-header">User Inforamtion</h3>
                                    <div className="general-information-table-container">
                                        <div className="general-information-col">
                                            <p className="information-tab">Full Name</p>
                                            <p>{data.user.firstName} {data.user.lastName}</p>
                                        </div>
                                        <div className="general-information-col">
                                            <p className="information-tab">User Name</p>
                                            <p>{data.user.userName}</p>
                                        </div>
                                        <div className="general-information-col">
                                            <p className="information-tab">Email</p>
                                            <p>{data.user.email}</p>
                                        </div>
                                        {
                                            data.user.image && (
                                                <div className="general-information-col">
                                                    <p className="information-tab">Image</p>
                                                    <p><img className="h-75" src={data.user.image} /></p>
                                                </div>
                                            )
                                        }
                                        <div className="general-information-col">
                                            <p className="information-tab">Phone</p>
                                            <p>{data.user.phone}</p>
                                        </div>
                                        <div className="general-information-col">
                                            <p className="information-tab">Age</p>
                                            <p>{data.user.age}</p>
                                        </div>
                                        <div className="general-information-col">
                                            <p className="information-tab">Country</p>
                                            <p>{CountryData.countries[data.user.country].name}</p>
                                        </div>
                                        <div className="general-information-col">
                                            <p className="information-tab">Gender</p>
                                            <p>{data.user.gender}</p>
                                        </div>
                                        <div className="general-information-col">
                                            <p className="information-tab">sport</p>
                                            <p>{data.user.sport}</p>
                                        </div>
                                        <div className="general-information-col">
                                            <p className="information-tab">Favorite Mountain</p>
                                            <p>{data.user.favoriteMountain}</p>
                                        </div>
                                        <div className="general-information-col">
                                            <p className="information-tab">Passes</p>
                                            <p>{data.user.passes.map((item, index) => (<span>{item + (index + 1 !== data.user.passes.length ? ',' : '')}</span>))}</p>
                                        </div>
                                        <div className="general-information-col">
                                            <p className="information-tab">Sport Love</p>
                                            <p>{data.user.sportLove.map((item, index) => (<span>{item + (index + 1 !== data.user.sportLove.length ? ',' : '')}</span>))}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </>
        )
    }

    return <div></div>;
}

export default ProductComponent;