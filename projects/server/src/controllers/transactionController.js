//import sequelize
const { sequelize } = require('../models')
const { Op } = require('sequelize')

const db = require('../models/index')
const moment = require('moment')
module.exports = {
    allTransaction: async (req, res) => {
        let { warehouse, order_status_id } = req.body

        if (order_status_id == undefined) {
            var response = warehouse ? await db.transaction.findAll({
                where: { warehouse_city: warehouse },
                include: [
                    { model: db.location_warehouse },
                    { model: db.transaction_detail },
                    { model: db.order_status }
                ]
            })
                :
                await db.transaction.findAll({
                    include: [
                        { model: db.location_warehouse },
                        { model: db.transaction_detail },
                        { model: db.order_status }
                    ]
                })
        } else {
            var response = warehouse ? await db.transaction.findAll({
                where: { warehouse_city: warehouse, order_status_id },
                include: [
                    { model: db.location_warehouse },
                    { model: db.transaction_detail },
                    { model: db.order_status }
                ]
            })
                :
                await db.transaction.findAll({
                    where: { order_status_id },
                    include: [
                        { model: db.location_warehouse },
                        { model: db.transaction_detail },
                        { model: db.order_status }
                    ]
                })
        }

        res.status(201).send({
            isError: false,
            message: 'get data transaction success!',
            data: response
        })
    },
    transactionWH: async (req, res) => {
        //     let {city} = req.body

        //    let response = await db.transaction.findAll({
        //     where:{
        //         warehouse_city:city
        //     }
        //    })

        //or you can use this?
        let { id } = req.body
        let response = await db.transaction.findAll({
            where: {
                location_warehouse_id: id
            }
        })
        res.status(201).send({
            isError: false,
            message: 'get data transaction success!',
            data: response
        })
    },
    filterWH: async (req, res) => {
        try {

            let { warehouse_city, order_status_id } = req.body

            let getData = order_status_id ? await db.transaction.findAll({
                where: {
                    warehouse_city, order_status_id
                },
                include: [
                    { model: db.location_warehouse },
                    { model: db.transaction_detail },
                    { model: db.order_status },
                ]
            }) : await db.transaction.findAll({
                where: {
                    warehouse_city
                },
                include: [
                    { model: db.location_warehouse },
                    { model: db.transaction_detail },
                    { model: db.order_status },
                ]
            })

            if (!getData) throw { message: 'Data Not Found!' }

            res.status(201).send({
                isError: false,
                message: 'get data success!',
                data: getData
            })
        } catch (error) {
            res.status(404).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },
    filter: async (req, res) => {
        try {
            let { data } = req.body

            let getData = data == "Warehouse" ? await db.location_warehouse.findAll() : null
            console.log(getData)

            res.status(201).send({
                isError: false,
                message: 'get data success!',
                data: getData
            })
        } catch (error) {
            console.log(error)
        }
    },
    getSales: async (req, res) => {
        let { start, end, type, WH } = req.query
        console.log(`ini warehouse ${WH}`)

        var total_transactionS = await db.transaction.findAll({
            where: {
                order_status_id: 5
            }
        })

        var total_transactionC = await db.transaction.findAll({
            where: {
                order_status_id: 6
            }
        })

        if (type == 1) {
            var response = WH == 0 ? await db.transaction.findAll({
                where: {
                    [Op.and]: [
                        {
                            updatedAt: {
                                [Op.gte]: start,
                                [Op.lt]: end
                            }
                        },
                        {
                            order_status_id: 5
                        }

                    ]

                },
                include: [
                    { model: db.location_warehouse },
                    { model: db.transaction_detail },
                    { model: db.order_status }
                ]
            }) : await db.transaction.findAll({
                where: {
                    [Op.and]: [
                        {
                            updatedAt: {
                                [Op.gte]: start,
                                [Op.lt]: end
                            }
                        },
                        {
                            order_status_id: 5
                        },
                        {
                            location_warehouse_id: WH
                        }
                    ]
                },
                include: [
                    { model: db.location_warehouse },
                    { model: db.transaction_detail },
                    { model: db.order_status }
                ]
            })

            var users = await db.user.findAll()
            var usersUV = await db.user.findAll({
                where: {
                    status: 'Unverified'
                }
            })
            var list_WH = WH == 0 ? await db.location_warehouse.findAll() : await db.location_warehouse.findOne({ where: { id: WH } })
            var warehouse = await db.location_warehouse.findAll()
        } else if (type == 2) {
            var response = WH == 0 ? await db.category.findAll({
                include: [
                    {
                        model: db.transaction_detail,
                        include: [
                            {
                                model: db.transaction,
                                where: {
                                    [Op.and]: [
                                        {
                                            updatedAt: {
                                                [Op.gte]: start,
                                                [Op.lt]: end
                                            }
                                        },
                                        {
                                            order_status_id: 5
                                        }
                                    ]

                                }
                            }
                        ]
                    }
                ]
            }) :
                await db.category.findAll({
                    include: [
                        {
                            model: db.transaction_detail,
                            include: [
                                {
                                    model: db.transaction,
                                    where: {
                                        [Op.and]: [
                                            {
                                                updatedAt: {
                                                    [Op.gte]: start,
                                                    [Op.lt]: end
                                                }
                                            },
                                            {
                                                order_status_id: 5
                                            },
                                            {
                                                location_warehouse_id: WH
                                            }
                                        ]

                                    }
                                }
                            ]
                        }
                    ]
                })
        } else if (type == 3) {
            var response = WH == 0 ? await db.transaction_detail.findAll({
                include: [{
                    model: db.transaction,
                    where: {
                        [Op.and]: [
                            {
                                updatedAt: {
                                    [Op.gte]: start,
                                    [Op.lt]: end
                                }
                            },
                            {
                                order_status_id: 5
                            }
                        ]
                    }
                }]
            })
                :
                await db.transaction_detail.findAll({
                    include: [{
                        model: db.transaction,
                        where: {
                            [Op.and]: [
                                {
                                    updatedAt: {
                                        [Op.gte]: start,
                                        [Op.lt]: end
                                    }
                                },
                                {
                                    order_status_id: 5
                                },
                                {
                                    location_warehouse_id: WH
                                }
                            ]
                        }
                    }]
                })

        }
        res.status(201).send({
            isError: false,
            data: response,
            users: users?.length ? users.length : null,
            userUV: usersUV?.length ? usersUV.length : null,
            wh: warehouse?.length ? warehouse.length : null,
            list_wh: list_WH,
            tr_success: total_transactionS?.length ? total_transactionS.length : null,
            tr_cancel: total_transactionC?.length ? total_transactionC.length : null
        })
    },
    CreateOrder: async (req, res) => {
        try {
            // let getToken = req.dataToken
            let { user_id, ongkir, receiver, address, warehouse_city, location_warehouse_id, courier, user_name, phone_number, subdistrict, province, city, upload_payment, cart } = req.body

            let findData = await db.user.findOne({
                where: {
                    id: user_id
                }
            })

            let dataWH = await db.location_warehouse.findAll()
            console.log(dataWH)

            var kreat = await db.transaction.create({
                user_id, ongkir, receiver, address, warehouse_city, location_warehouse_id, courier, user_name, phone_number, subdistrict, city, province, upload_payment, order_status_id: 1
            })

            cart.forEach(async (item, index) => {
                await db.transaction_detail.create({
                    transaction_id: kreat.dataValues.id, qty: item.qty, price: item.product_detail.price,
                    product_name: item.product.name, weight: item.product_detail.weight, memory_storage: item.product_detail.memory_storage,
                    color: item.product_detail.color, product_img: item.product.product_images[0].img, category_id: item.product.category_id, product_detail_id: item.product_detail.id,

                })
            })

            res.status(201).send({
                isError: false,
                message: 'data success',
                data: kreat
            })
        } catch (error) {
            console.log(error)
        }
    }

}