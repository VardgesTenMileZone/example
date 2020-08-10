import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/SpinnerComponent/SpinnerComponent';
import { marketingSubmit } from '../../store/actions/MarketingAction';
import InnerPageComponent from '../../components/InnerPageComponent/InnerPageComponent';
import MarketingComponent from '../../components/MarketingComponent/MarketingComponent';

const MarketingContainer = ({
    marketing,
    marketingSubmit
}) => {
    console.log(marketing, marketingSubmit);
    return(
        <>
            {marketing.reportsStatus === 'pending' && <Spinner />}
            <InnerPageComponent>
                <MarketingComponent 
                    marketingSubmit={marketingSubmit}
                    marketingData={marketing}
                />
            </InnerPageComponent>
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    marketingSubmit: body => dispatch(marketingSubmit(body))
});

const mapStateToProps = state => ({
    marketing: state.marketing
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketingContainer);