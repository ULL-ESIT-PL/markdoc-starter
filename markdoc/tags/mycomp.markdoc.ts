import {MyComp} from '../../components';

export const mycomp = {
  render: MyComp,
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    title: {
      type: String,
    },
    otro: {
      type: String,
    },
    escierto: Boolean,
  },
};
