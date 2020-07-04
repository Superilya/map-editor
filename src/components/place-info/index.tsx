import React, { useCallback } from 'react';
import { Place } from 'src/types/api';
import { MenuPart } from 'src/components/menu-part';
import { UserInfo } from 'src/components/user-info';
import { IconAction } from 'src/components/icon-action';
import { changeMyPlace } from 'src/ducks/places/actions';
import { Icon } from 'src/components/ui/icon';
import { goToPage } from 'src/ducks/app/actions';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { buildingLink } from 'src/routing/links';
import { BuildingPageParams } from 'src/types/routing';
import { Box, ActionsBox, ActionBox, CloseAction } from './styles';

type PropsType = {
    place: Place;
};

export const PlaceInfo = ({ place }: PropsType) => {
    const put = useDispatch();
    const match = useRouteMatch<BuildingPageParams>();
    const handleClickClose = () => {
        put(goToPage(buildingLink.get(match.params)));
    };
    const handleClickSit = useCallback(() => {
        put(changeMyPlace(place.id));
    }, [place.id, put]);

    return (
        <MenuPart
            title="Place"
            action={
                <CloseAction onClick={handleClickClose}>
                    <Icon name="fa-times" />
                </CloseAction>
            }
        >
            <Box>
                <ActionsBox>
                    <ActionBox>
                        <IconAction
                            title="Sit here"
                            icon="fa-map-pin"
                            onClick={handleClickSit}
                        />
                    </ActionBox>
                    <ActionBox>
                        <IconAction title="Share" icon="fa-share-square" />
                    </ActionBox>
                </ActionsBox>
                {place.userId && <UserInfo userId={place.userId} />}
            </Box>
        </MenuPart>
    );
};
