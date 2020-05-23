import React, { Component } from 'react';
import { Image, Group, Circle, StageProps } from 'react-konva';

type PropsType = StageProps & {
    src: string;
}

type StateType = {
    image?: HTMLImageElement;
}

export class MapUrlImage extends Component<PropsType, StateType> {
    private image?: HTMLImageElement;

    state: StateType = {};

    componentDidMount() {
        this.loadImage();
    }

    componentDidUpdate(oldProps: PropsType) {
        if (oldProps.src !== this.props.src) {
            this.loadImage();
        }
    }

    componentWillUnmount() {
        if (this.image) {
            this.image.removeEventListener('load', this.handleLoad);
        }
    }

    loadImage() {
        // save to "this" to remove "load" handler on unmount
        this.image = new window.Image();
        this.image.src = this.props.src;
        this.image.addEventListener('load', this.handleLoad);
    }

    handleLoad = () => {
        // after setState react-konva will update canvas and redraw the layer
        // because "image" property is changed
        this.setState({
            image: this.image
        });
        // if you keep same image object during source updates
        // you will have to update layer manually:
        // this.imageNode.getLayer().batchDraw();
    };

    render() {
        const { src, ...other } = this.props;

        return (
            <Image
                { ...other }
                image={this.state.image}
                // ref={node => {
                //     this.imageNode = node;
                // }}
            />
        );
    }
}