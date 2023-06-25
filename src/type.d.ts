interface ILocation{
    id: string,
    desc: string,
    name: string,
    alias: string,
    updatedAt: number,
    address: string,
    status: string,
}

type LocationState = {
    locations: Array<ILocation>,
    locationCopy: Array<ILocation>,
    selectedLocation: ILocation,
    selectedId: string,
}

type LocationAction = {
    type: string,
    location: ILocation,
    locations: ILocation[],
    payload: any
}

type DispatchType = (args : LocationAction) => LocationAction