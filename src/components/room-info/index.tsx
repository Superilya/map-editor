import React, { useCallback } from 'react';
import { Room } from 'src/types/api';
import { MenuPart } from 'src/components/menu-part';
import { IconAction } from 'src/components/icon-action';
import { editStart } from 'src/ducks/room-editing/actions';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { BuildingPageParams } from 'src/types/routing';
import { buildingLink } from 'src/routing/links';
import { goToPage } from 'src/ducks/app/actions';
import { Icon } from 'src/components/ui/icon';
import { Box, ActionsBox, ActionBox, CloseAction } from './styles';

type PropsType = {
    room: Room;
};

export const RoomInfo = ({ room }: PropsType) => {
    const put = useDispatch();
    const match = useRouteMatch<BuildingPageParams>();
    const handleClickClose = () => {
        put(goToPage(buildingLink.get(match.params)));
    };
    const handleClickEdit = useCallback(() => {
        put(editStart(room.id));
    }, [put, room.id]);

    return (
        <MenuPart
            title={room.label}
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
                            icon="fa-pen"
                            onClick={handleClickEdit}
                        />
                    </ActionBox>
                </ActionsBox>
            </Box>
        </MenuPart>
    );
};
