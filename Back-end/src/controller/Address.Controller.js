import { AddreshModel } from "../model/Addresh.Model.js"

const AddAdress = async (req, res) => {
    try {
        let { name, number, pincode, address, city, state, address_type } = req.body

        name = name?.trim()
        address = address?.trim()
        city = city?.trim()
        state = state?.trim()
        address_type = address_type?.trim()

        if (!name || !number || !pincode || !address || !city || !state || !address_type) {
            return res.status(400).json({ message: 'All Fields are Required!' })
        }

        const user = req.user._id

        let FindUser = await AddreshModel.findOne({ user_id: user })

        if (!FindUser) {
            FindUser = new AddreshModel({
                user_id: user,
                address: []
            })
            await FindUser.save()
        }

        FindUser.address.push({
            name,
            number,
            pincode,
            address,
            city,
            state,
            address_type
        })

        await FindUser.save()
        return res.status(200).json({ message: "Addresh Added Succesfully!" })

    } catch (error) {
        return res.status(500).json({ message: "Somthing wrong try again!" })
    }
}

const FetchAddress = async (req, res) => {
    try {
        const user = req.user._id

        const FindUser = await AddreshModel.findOne({user_id : user})

        if(!FindUser){
            return res.status(400).json({ message: "User Don't Exist!" })
        }

        return res.status(200).json({ message: "Addresh Fetch Succesfully!", FindUser })

    } catch (error) {
        return res.status(500).json({ message: "Somthing wrong try again!" })
    }
}

export {
    AddAdress,
    FetchAddress
}