import ILovePDFApi from '@ilovepdf/ilovepdf-nodejs';
import ILovePDFFile from '@ilovepdf/ilovepdf-js-core/utils/ILovePDFFile';

// import fs from 'fs';
// import dotenv from 'dotenv';
// import WatermarkTask from '@ilovepdf/ilovepdf-js-core/tasks/WatermarkTask';
const IlovePdf = async (pdfFile) => {

    try {
        const token = new ILovePDFApi('project_public_b43dbf10abc2e979e5ff95bcbee3333c_GeNtD3fe592eae17182359633379259ac5c6a', 'secret_key_3f6bfd63ef215c99ee9a25cb58f0e8de_2Oa9a756ec9b7179ecfa0089164ead834d0ca');

        const task = token.newTask('watermark');
        const file = new ILovePDFFile(path.resolve(__dirname, pdfFile));
        // const sello = new ILovePDFFile(path.resolve(__dirname, './path/to/file_name.pdf'));
        await task.addFile(file);
        // await task.addFile(sello);
        await task.process({
            output_filename: '{n}_{filename}_{date}',
            mode: 'text',
            text: 'MiMarca',
            font_family: 'Verdana',
            font_style: 'Bold',
            font_size: 10,
            font_color: '#000',
            transparency: 50,
            horizontal_position: "right",
            vertical_position: "bottom",
            horizontal_position_adjustment: 50,
            rotation: 180,
            transparency: 50
        });
        return await task.download();

        // fs.writeFileSync(path.resolve(__dirname,'documents/'), data);

    } catch (err) {
        console.log('err', err)
        if (err instanceof AuthError) {
            console.log('Error on auth!');
        }
    }
}
export default IlovePdf;