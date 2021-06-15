import { Injectable } from '@angular/core';
import {State, NgxsOnInit, Action, StateContext, Select, Selector} from '@ngxs/store';
import { TodoActions } from './todo-actions';
import { patch, updateItem } from '@ngxs/store/operators';

export interface ITodo {
    id: string;
    title: string;
    is_done: boolean;
}
export interface ITo {
  id: string;
  state: string;
}
export interface ITodoStateModel {
    todoList: ITodo[];
    txt: ITo[];
}

@State<ITodoStateModel>({
    name: 'todoList',
    defaults: {
        todoList: [],
        txt: []
    },
})
@Injectable()
export class TodoState implements NgxsOnInit {
    ngxsOnInit(ctx) {
        ctx.dispatch(new TodoActions.FetchAllTodos());
    }
    @Action(TodoActions.AddTo)
    // tslint:disable-next-line:typedef
    addto(ctx: StateContext<ITodoStateModel>, {payload}: TodoActions.AddTo) {
      const state = ctx.getState();
      ctx.setState({
        ...state,
        txt: [
          ...state.txt,
          {
            ...payload
          }
        ]
      });
    }
    @Action(TodoActions.markDone)
    markDone(ctx: StateContext<ITodoStateModel>, { payload, is_done }: TodoActions.markDone) {

        ctx.setState(
            patch({
                todoList: updateItem((item: ITodo) => item.id === payload, patch({ is_done: !is_done }))
            })
        );
    }

    @Action(TodoActions.AddTodo)
    add(
        ctx: StateContext<ITodoStateModel>,
        { payload }: TodoActions.AddTodo,
    ) {
        const state = ctx.getState();

        ctx.setState({
            ...state,
          txt: [
            ...state.txt,
            {
               id: Math.random().toString(36).substring(7),
              state: '0'
            }
          ],
            todoList: [
                ...state.todoList,
                {
                    ...payload,
                    id: Math.random().toString(36).substring(7),
                    is_done: false
                }
            ],
        }
        );
    }

}
