import { ContactData } from "src/model/data";
import DataProvider from "./DataProvider";

export default class ContactDataProvider extends DataProvider<ContactData[]> {
    public getData(): ContactData[] {
        return this.getJsonData();
    }
}