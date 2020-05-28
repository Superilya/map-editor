import React, { Component } from 'react'
import { Image, StageProps } from 'react-konva'

type PropsType = StageProps & {
  src: string
}

type StateType = {
  image?: HTMLImageElement
}

export class MapUrlImage extends Component<PropsType, StateType> {
  private image?: HTMLImageElement

  state: StateType = {}

  componentDidMount() {
    this.loadImage()
  }

  componentDidUpdate(oldProps: PropsType) {
    const { src } = this.props

    if (oldProps.src !== src) {
      this.loadImage()
    }
  }

  componentWillUnmount() {
    if (this.image) {
      this.image.removeEventListener('load', this.handleLoad)
    }
  }

  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image,
    })
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  }

  loadImage() {
    // save to "this" to remove "load" handler on unmount
    const { src } = this.props

    this.image = new window.Image()
    this.image.src = src
    this.image.addEventListener('load', this.handleLoad)
  }

  render() {
    const { image } = this.state

    return (
      <Image
        {...this.props}
        image={image}
        // ref={node => {
        //     this.imageNode = node;
        // }}
      />
    )
  }
}
