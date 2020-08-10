import React from 'react';
import { connect } from 'react-redux';
import ReportsComponent from '../../components/ReportsComponent/ReportsComponent';
import Spinner from '../../components/SpinnerComponent/SpinnerComponent';
import { toast } from 'react-toastify';
import { reportGetDownload, seasonReportGetDownload, getRidershipReports } from '../../store/actions/ReportsAction';
import InnerPageComponent from '../../components/InnerPageComponent/InnerPageComponent';

const ReportsContainer = ({
    reports: { reportsStatus, data, seasonReportStatus, ridershipReportsData, ridershipReportsStatus, seasonReportData },
    reportsAction,
    seasonReportGetDownload,
    getRidershipReports
}) => {
    const handleClick = reportData => {
        if (!reportData.year || !reportData.month) {
            return toast.error('Please choose year or month')
        }

        reportsAction({
            value: `${reportData.year}-${(reportData.month < 10) ? 0 + reportData.month : reportData.month}`
        });
    }

    return (
        <>
            {(reportsStatus === 'pending' || seasonReportStatus === 'pending' || ridershipReportsStatus === 'pending' ) && <Spinner />}
            <InnerPageComponent>
                <ReportsComponent
                    reportGetDownload={reportGetDownload}
                    reportsStatus={reportsStatus}
                    data={data}
                    seasonReport={{ seasonReportData, seasonReportStatus }}
                    ridershipReports={{ ridershipReportsData, ridershipReportsStatus }}
                    seasonReportGetDownload={seasonReportGetDownload}
                    handleClick={handleClick}
                    getRidershipReports={getRidershipReports}
                />
            </InnerPageComponent>
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    reportsAction: body => dispatch(reportGetDownload(body)),
    seasonReportGetDownload: () => dispatch(seasonReportGetDownload()),
    getRidershipReports: () => dispatch(getRidershipReports()),
});

const mapStateToProps = state => ({
    reports: state.reports
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportsContainer);