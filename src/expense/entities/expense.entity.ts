import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps:true})
export class Expense {

    @Prop()
    category:string

    @Prop({index:true})
    cost:number

    @Prop()
    description:string


}


export const ExpenseSchema = SchemaFactory.createForClass(Expense)
