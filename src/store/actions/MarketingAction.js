import { MARKETING } from '../constants';
import Http from '../../shared/Http/Http';

export const marketingSubmit = body => async (dispatch) => {
    try {
        dispatch({ type: MARKETING.PENDING });
        const data = await Http.get(`/admin/all/reports`, body, false, false);
        dispatch({ type: MARKETING.SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: MARKETING.ERROR, error: error });
    }
};
