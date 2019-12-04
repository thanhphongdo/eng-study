import Vuex from 'vuex';
import ParseService from '../services/parse.service';
import { ACTION, MUTATION, CONTRACT } from './enums';
import * as courseModule from './modules/course';
import * as wordStudyModule from './modules/word_study';
const Parse = new ParseService();
if (process.browser) {
  window.Parse = Parse;
}
const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      isWaiting: true,
      timeStartWaiting: 0,
      timeEndWaiting: 0,
      locales: ['vn', 'fr'],
      locale: 'vn',
      page: {
        course: false,
        game: false,
        account: false
      },
      data: {
        members: []
      },
      model: {
        transaction: {
          member: null,
          members: null
        }
      }
    }),
    mutations: {
      SET_LANG(state, locale) {
        if (state.locales.includes(locale)) {
          state.locale = locale
        }
      },
      showWaiting(state) {
        state.isWaiting = true;
        state.timeStartWaiting = Date.now();
      },
      hideWaiting(state) {
        state.isWaiting = false;
        state.timeEndWaiting = Date.now();
        console.log('waiting time: ' + (state.timeEndWaiting - state.timeStartWaiting));
      },
      setPage(state, page) {
        let keys = Object.keys(state.page);
        keys.forEach(key => {
          state.page[key] = false;
        });
        state.page[page] = true;
      }
    },
    actions: {

    },
    modules: {
      course: courseModule.default,
      wordStudy: wordStudyModule.default,
    }
  });
}

export default createStore;