import axios from 'axios';

export const autenticar = async () => {
    const public_key = JSON.stringify({
        "public_key": "project_public_b43dbf10abc2e979e5ff95bcbee3333c_GeNtD3fe592eae17182359633379259ac5c6a"
    });

    const config = {
        method: 'post',
        url: 'https://api.ilovepdf.com/v1/auth',
        headers: {
            'Content-Type': 'application/json'
        },
        data: public_key
    };

    const { data } = await axios(config);

    return data.token
}

export const iniciarHerramienta = async (token) => {
    const config = {
        method: 'get',
        url: 'https://api.ilovepdf.com/v1/start/watermark',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const { data } = await axios(config);
    return data;
}

export const cargarArchivo = async (token, server, task, filename) => {
    let resp = new FormData();
    resp.append('task', task);
    resp.append('file', filename);

    const config = {
        method: 'post',
        url: `https://${server}/v1/upload`,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        data: resp
    };

    const { data } = await axios(config)
    return data.server_filename
}

const procesarArchivo = async (token, task, server, filename, sello, tool = 'watermark') => {
    const info = JSON.stringify({
        "task": task,
        "tool": tool,
        "files": filename,
        "mode": "image",
        "image": sello,
        "horizontal_position": "left",
        "vertical_position": "bottom",
        "horizontal_position_adjustment": 0,
        "vertical_position_adjustment": -10,
        "rotation": 0,
        "transparency": 50,
    });

    var config = {
        method: 'post',
        url: `https://${server}/v1/process`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        data: info
    };

    const { data } = await axios(config);
    return data;
}

const descargarArchivo = async (token, server, task) => {
    var config = {
        method: 'get',
        url: `https://${server}/v1/download/${task}`,
        responseType: 'blob',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };

    const { data } = await axios(config);
    return data;

}

const watermark = async (files, sello) => {
    const token = await autenticar();
    const { task, server } = await iniciarHerramienta(token)
    let filename = [];
    if (files.length > 0) {
        for (const file of files) {
            filename = [...filename, {
                "server_filename": await cargarArchivo(token, server, task, file),
                "filename": `watermark-${Date.now()}.pdf`
            }]
        }
    }
    if (sello) {

        const imgSello = await cargarArchivo(token, server, task, sello);

        const { status, download_filename } = await procesarArchivo(token, task, server, filename, imgSello);

        if (status !== 'TaskSuccess') {

            return {
                status: false
            }
        }

        const fileDowload = await descargarArchivo(token, server, task)

        return {
            status: true,
            file: fileDowload,
            fileName: download_filename
        };
    }

}

export default watermark