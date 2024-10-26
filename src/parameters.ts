import { IParameterApi, ISessionApi, PARAMETER_TYPE } from "@shapediver/viewer";

const createParamDiv = (paramObject: IParameterApi<any>, parentDiv: HTMLDivElement) => {
    const paramDiv = document.createElement("div") as HTMLDivElement;
    parentDiv.appendChild(paramDiv);

    const label = document.createElement("label") as HTMLLabelElement;
    paramDiv.appendChild(label);
    label.innerText = paramObject.displayname || paramObject.name;

    return paramDiv;
}

const createBooleanParameterElement = (session: ISessionApi, paramObject: IParameterApi<boolean>, parentDiv: HTMLDivElement) => {
    // create a div to include all the elements of this parameters
    const paramDiv = createParamDiv(paramObject, parentDiv);

    // create input element
    const inputElement = document.createElement('input') as HTMLInputElement;
    paramDiv.appendChild(inputElement);
    inputElement.type = "checkbox";
    inputElement.checked = paramObject.value === true || paramObject.value === "true";
    inputElement.onchange = async () => {
        paramObject.value = inputElement.checked;
        await session.customize();
    }
}

const createNumberParameterElement = (session: ISessionApi, paramObject: IParameterApi<number>, parentDiv: HTMLDivElement) => {
    // create a div to include all the elements of this parameters
    const paramDiv = createParamDiv(paramObject, parentDiv);

    // create input element
    const inputElement = document.createElement('input') as HTMLInputElement;
    paramDiv.appendChild(inputElement);
    inputElement.type = "number";
    inputElement.value = paramObject.value + "";
    inputElement.min = paramObject.min + "";
    inputElement.max = paramObject.max + "";
    inputElement.name = paramObject.name;

    if(paramObject.type === PARAMETER_TYPE.INT) {
         inputElement.step = "1";
    }   else if(paramObject.type === PARAMETER_TYPE.EVEN || paramObject.type === PARAMETER_TYPE.ODD) {
        inputElement.step = "2";
    } else {
        inputElement.step = 1 / Math.pow(10, paramObject.decimalplaces) + "";
    }

    inputElement.onchange = async () => {
        paramObject.value = inputElement.value;
        await session.customize();
    }
}


const createStringParameterElement = (session: ISessionApi, paramObject: IParameterApi<string>, parentDiv: HTMLDivElement) => {
    // create a div to include all the elements of this parameters
    const paramDiv = createParamDiv(paramObject, parentDiv);

    // create input element
    const inputElement = document.createElement('input') as HTMLInputElement;
    paramDiv.appendChild(inputElement);
    inputElement.type = "text";
    inputElement.value = paramObject.value;
    inputElement.onchange = async () => {
        paramObject.value = inputElement.value;
        await session.customize();
    }
}

const createColorParameterElement = (session: ISessionApi, paramObject: IParameterApi<string>, parentDiv: HTMLDivElement) => {
    // create a div to include all the elements of this parameters
    const paramDiv = createParamDiv(paramObject, parentDiv);

    // create input element
    const inputElement = document.createElement('input') as HTMLInputElement;
    paramDiv.appendChild(inputElement);
    inputElement.type = "color";
    inputElement.value = paramObject.value.replace("0x", "#").substring(0, 7);
    inputElement.onchange = async () => {
        paramObject.value = inputElement.value;
        await session.customize();
    }
}

const createStringListParameterElement = (session: ISessionApi, paramObject: IParameterApi<string>, parentDiv: HTMLDivElement) => {
    // create a div to include all the elements of this parameters
    const paramDiv = createParamDiv(paramObject, parentDiv);

    // create input element
    const selectElement = document.createElement('select') as HTMLSelectElement;
    paramDiv.appendChild(selectElement);

    for(let i = 0; i < paramObject.choices!.length; i++) {
        const option = document.createElement('option') as HTMLOptionElement;
        option.value = i + "";
        option.innerText = paramObject.choices![i];
        selectElement.appendChild(option);
    }

    selectElement.onchange = async () => {
        paramObject.value = selectElement.value;
        await session.customize();
    }
}

const createFileParameterElement = (session: ISessionApi, paramObject: IParameterApi<File | Blob | string>, parentDiv: HTMLDivElement) => {
    // create a div to include all the elements of this parameters
    const paramDiv = createParamDiv(paramObject, parentDiv);

    // create input element
    const inputElement = document.createElement('input') as HTMLInputElement;
    paramDiv.appendChild(inputElement);
    inputElement.type = "file";
    inputElement.accept = paramObject.format!.join(',');

    inputElement.onchange = async () => {
        if(!inputElement.files || !inputElement.files[0]) return;
        paramObject.value = inputElement.files[0];
        await session.customize();
    }
}

export const createParameterMenu = (session: ISessionApi) => {
    const menuDiv = document.getElementById("menu") as HTMLDivElement;

    menuDiv.innerHTML = '';

    const orderedParams = Object.values(session.parameters).sort((a: IParameterApi<any>, b: IParameterApi<any>) => (a.order || Infinity) - (a.order || Infinity));
    
    for(let i = 0; i < orderedParams.length; i++) {
        const paramObject = orderedParams[i];

        // hide
        if(paramObject.hidden === true) continue;

        switch(paramObject.type) {
            case PARAMETER_TYPE.BOOL:
                createBooleanParameterElement(session, paramObject, menuDiv)
                break;

            case PARAMETER_TYPE.FLOAT:
            case PARAMETER_TYPE.INT:
            case PARAMETER_TYPE.ODD:
            case PARAMETER_TYPE.EVEN:
                createNumberParameterElement(session, paramObject, menuDiv)
                break;
            
            case PARAMETER_TYPE.COLOR:
                createColorParameterElement(session, paramObject, menuDiv)
                break;

            case PARAMETER_TYPE.STRING:
                createStringParameterElement(session, paramObject, menuDiv)
                break;

            case PARAMETER_TYPE.STRING:
                createStringListParameterElement(session, paramObject, menuDiv)
                break;

            case PARAMETER_TYPE.STRING:
                createFileParameterElement(session, paramObject, menuDiv)
                break;
            default:
                console.log(paramObject.type)
        }
    }
}