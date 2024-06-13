import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './entities/expense.entity';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';

@Injectable()
export class ExpenseService implements OnModuleInit {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
  ) {}
  async onModuleInit() {
    const count = await this.expenseModel.countDocuments();
    const arrayToInsert = [];
    if (count === 0) {
      for (let i = 0; i < 20000; i++) {
        const expense = {
          category: faker.commerce.department(),
          cost: faker.number.int({ min: 1, max: 1000 }),
          description: faker.commerce.productDescription(),
        };
        arrayToInsert.push(expense);
        }
      await this.expenseModel.insertMany(arrayToInsert)
    }
    console.log(count, 'Count on init');
  }

  create(createExpenseDto: CreateExpenseDto) {
    return 'This action adds a new expense';
  }

  findAll(queryParams) {
    const page = Number(queryParams.page) || 1
    const perPage = Number(queryParams.perPage) || 20
    if(perPage > 30) throw new HttpException("Page Can't Be More Than 20",HttpStatus.NOT_FOUND)
    return this.expenseModel
    .find()
    .skip((page - 1) * perPage)
    .limit(perPage)
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
