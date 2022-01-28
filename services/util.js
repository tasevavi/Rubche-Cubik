function accessoryViewModel(accessory) {
    return {
        id: accessory._id, 
        name: accessory.name, 
        description: accessory.description, 
        imageUrl: accessory.imageUrl, 
        price: accessory.price
    };
}

function cubeViewModel(cube) {
    const model = {
        id: cube._id, 
        name: cube.name, 
        description: cube.description, 
        imageUrl: cube.imageUrl, 
        price: cube.price,
        accessories: cube.accessories
    }

    if (model.accessories.length > 0 && model.accessories[0].name) {
        model.accessories = model.accessories.map(accessoryViewModel);
    }
}

module.exports = {
    accessoryViewModel, 
    cubeViewModel
}