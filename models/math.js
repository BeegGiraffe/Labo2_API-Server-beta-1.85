import Model from './model.js';

export default class Math extends Model {
    constructor() {
        super();

        this.addField('Name', 'string');
        this.addField('Phone', 'phone');
        this.addField('Email', 'email');
        this.addField('Avatar', 'asset');

        //this.setKey("Name");
    }
}