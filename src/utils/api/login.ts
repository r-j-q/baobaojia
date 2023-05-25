import service from "../http";


export let login = (data: any) => {
    return    service({
        url: "/re",
        method: "POST",
        data: data,

    })
}








