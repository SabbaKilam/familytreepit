const s = {
	rootStyle: `
		display: grid;
		place-content: center;
		height: 100vh;
		width: 100vw;
		margin: 0;
		padding: 0;
		overflow: hidden;
		font-size: calc(0.5vh + 0.5vw + 10px);
		tap-highlight-color: transparent;
		background: hsla(180, 50%, 50%, 0.5);
		overflow: hidden;
	`,
	
	bodyStyle: `
		display: grid;
		place-content: center;	
		background-color: gray;
		height: 100vh;
		width: 100vw;
		margin: 0;
		padding: 0;
		overflow: hidden;
		box-shadow: 1rem 1rem 5rem gray;
		user-select: none;
		overflow: hidden;		
	`,
	
	infoHolderStyle: `
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		height: 7vh;
		min-height: 25px;
		padding: 0.25rem;
		background-image: linear-gradient(-20deg, white, lightblue, white);
		text-shadow: 0 1px 0 white;
		font-size: 1.05rem;
		font-weight: bold;
		color: black;
		z-index: 2;
	`,
	
	loggerVisibleStyle: `
		visibility: visible;
		opacity: 1;
	`,
	
	loggerHiddenStyle: `
		visibility: hidden;
		opacity: 0;
	`,
	
	infoStyle: `
		position: absolute;
		display: inline-block;
		min-width: 100px;
		bottom: 0;
		left: 40vw;
		transform: translate(-50%, -50%);
		text-align: center;
	`,	
	
	veilStyle: `
		position: absolute;
		top: 0;
		left:0;
		overflow: hidden;
		height: 100%;
		width: 100%;
		background: lightgray;
		opacity:  1;
		visibility: visible;
		transition: all 1.5s ease;
		z-index: 10;
	`,
	
	veilHideStyle: `
		opacity:  0;
		visibility: hidden;
	`,
	
	veilShowStyle: `
		opacity:  1;
		visibility: visible;
	`,
	
	cameoStyle: `
		position: absolute;
		display: block;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 10.5vw;
		width: 10.5vw;
		border-radius: 50%;
		cursor: pointer;
		background-color: rgb(19, 210, 142);
		background-repeat: no-repeat ;
		background-size: cover;
		transition: all 0.5s ease;	
	`,
	
	partialCameoStyle: `
		position: absolute;
		display: inline-block;	 
		border-radius: 50%;
		box-shadow: 0.125rem 0.125rem 0.5rem gray;
		background-color: transparent;
		background-repeat: no-repeat ;
		background-size: 75% 75%;	
		background-position: 100% 100%;      
   `,
   
   passwordWallStyle: `
		position: absolute;
		bottom: 0;
		left:0;
		overflow: hidden;
		height: 100vh;
		width: 100vw;
		background: lightgray;
		opacity:  1;
		visibility: visible;
		transition: opacity 0.5s ease;
		z-index: 15;   
   `,
   cameoCommBoxStyle: `
		position: absolute;
		bottom: 5vh;
		width: 90vw;
		height: 60%;
		left: 50%;
		transform: translate(-50%);
		border-radius: 1rem;
		box-shadow: 0.5rem 0.5rem 0.5rem gray;
   `,
   loggedInStyle: `
    	animation: pulse 3s infinite;
   `,
};

export default s;