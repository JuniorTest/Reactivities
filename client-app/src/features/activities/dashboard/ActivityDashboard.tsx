import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Grid, List } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityStore from '../../../app/stores/activityStore'
import LoadingComponet from '../../../app/layout/LoadingComponent';

const ActivityDashboard: React.FC = () => {

    const activityStore = useContext(ActivityStore);
    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    if (activityStore.loadingInitial) return <LoadingComponet content='Loading activities...' />


    return (
        <Grid>
            <Grid.Column width={10}>
                <List>
                    <ActivityList />
                </List>
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>
    );
}

export default observer(ActivityDashboard);
