import React, { useState } from 'react';
import { Button } from '@cassler/components';
import { colors } from '@cassler/typography';

// import './NeuCard.css'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

export interface NeuCardPropsI {
	src: string,
	color?: string,
	width?: number
}

export function NeuCard({ src, color, width = 500 }: NeuCardPropsI) {
	const [flipped, flip] = useState(false)
	const style = css`
	font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
		/* box-shadow: 2px 3px 10px #e3e3e6; */
		padding: 20px;
		max-width: ${width}px;
		/* padding: */
		figure {
			margin: 0;
			position: relative;
			img {
				max-width: ${width}px;
			}
			img.fg {
				 cursor: pointer;
				 border-radius: 15px;
			}
			img.bg {
				width: 100%;
				height: auto;
				-webkit-filter: blur(15px);
				filter: blur(15px);
				opacity:0.5;
			}
		}
		.round {
			top:0;
			left:0;
			position: absolute;
			overflow:hidden;
			/* clip-path: border-box; */
		}
		figcaption {
			padding: 10px;
		}
		h3 {
			font-weight: 500;
			color: #222;
			margin: 0;
			padding: 10px 0 5px 0;
			font-size: 20px;
		}
		.neu-subtitle {
			color: ${colors.blue[2]};
			margin: 0 0 20px;
			padding: 0;
			font-size: 15px;
		}

	`;

	return (
		<div css={style}>
			<figure>
				<img className='bg' src={src} />
				<div className="round">
					<img className='fg' src={src} />
				</div>
				<figcaption>
					<h3>Hello there</h3>
					<p className="neu-subtitle">There's something here {flipped && 'WE FLIPPED IT'}</p>
					<Button label="Haha" size="medium" primary use3D ghost onClick={() => flip(!flipped)} />
				</figcaption>
			</figure>
		</div>
	)
}

export default NeuCard
