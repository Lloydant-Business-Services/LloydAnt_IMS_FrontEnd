import {
	Plane,
	Program,
	Mesh,
	Renderer,
	Texture,
} from 'https://unpkg.com/ogl@0.0.49/src/index.mjs';

class ImageLoader {
	static loadFromUrl(src) {
		const image = new Image();
		
		image.setAttribute('crossorigin', true);
		
		return new Promise((resolve, reject) => {
			image.addEventListener('load', () => resolve(image));
			image.addEventListener('error', () => reject(new Error('Unable to load image')));
			image.src = src;
		});
	}
	
	static loadFromFile(file) {
		return ImageLoader.loadFromUrl(URL.createObjectURL(file));
	}
}

class Application {
	constructor() {
		this._renderer = new Renderer();
		this._map = new Texture(this._gl);
		this._mesh = this.createMesh(this._map);
	}
	
	get canvas() {
		return this._renderer.gl.canvas;
	}
	
	createMesh(map) {
		const geometry = new Plane(this._gl, {
			height: 2,
			width: 2,
		});
		
		const program = new Program(this._gl, {
			fragment: `
				precision mediump float;

				uniform float u_brightness;
				uniform float u_contrast;
				uniform float u_exposure;
				uniform sampler2D u_map;
				uniform float u_saturation;

				varying vec2 v_uv;

				vec3 adjustBrightness(vec3 color, float value) {
					return color + value;
				}

				vec3 adjustContrast(vec3 color, float value) {
					return 0.5 + (1.0 + value) * (color - 0.5);
				}

				vec3 adjustExposure(vec3 color, float value) {
					return color * (1.0 + value);
				}

				vec3 adjustSaturation(vec3 color, float value) {
					// https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
					const vec3 luminosityFactor = vec3(0.2126, 0.7152, 0.0722);
					vec3 grayscale = vec3(dot(color, luminosityFactor));

					return mix(grayscale, color, 1.0 + value);
				}

				void main() {
					vec4 texel = texture2D(u_map, v_uv);
					vec3 color = texel.rgb;

					color = adjustBrightness(color, u_brightness);
					color = adjustContrast(color, u_contrast);
					color = adjustExposure(color, u_exposure);
					color = adjustSaturation(color, u_saturation);

					gl_FragColor = vec4(color, texel.a);
				}
			`,
			vertex: `
				attribute vec4 position;
				attribute vec2 uv;

				varying vec2 v_uv;

				void main() {
					v_uv = uv;

					gl_Position = position;
				}
			`,
			
			uniforms: {
				u_brightness: { value: 0 },
				u_contrast: { value: 0 },
				u_exposure: { value: 0 },
				u_map: { value: map },
				u_saturation: { value: 0 },
			},
		});
		
		return new Mesh(this._gl, {
			geometry,
			program,
		});
	}
	
	setBrightness(value) {
		this._mesh.program.uniforms.u_brightness.value = value;
		this.render();
	}
	
	setContrast(value) {
		this._mesh.program.uniforms.u_contrast.value = value;
		this.render();
	}
	
	setExposure(value) {
		this._mesh.program.uniforms.u_exposure.value = value;
		this.render();
	}
	
	setImage(image) {
		this._map.image = image;
		this._map.needsUpdate = true;
		
		this.setSize(image.naturalWidth, image.naturalHeight);
		this.render();
	}
	
	setSaturation(value) {
		this._mesh.program.uniforms.u_saturation.value = value;
		this.render();
	}
	
	setSize(width, height) {
		this._renderer.setSize(width, height);
	}
	
	render() {
		this._renderer.render({
			scene: this._mesh,
		});
	}
	
	get _gl() {
		return this._renderer.gl;
	}
}

(async () => {
	const inputBrightness = document.getElementById('input-brightness');
	const inputContrast = document.getElementById('input-contrast');
	const inputExposure = document.getElementById('input-exposure');
	const inputImage = document.getElementById('input-image');
	const inputSaturation = document.getElementById('input-saturation');
	
	const image = await ImageLoader.loadFromUrl('https://images.unsplash.com/photo-1525253013412-55c1a69a5738?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=90');
	const app = new Application();
	
	app.setImage(image);
	app.render();

	document.getElementById('canvas-container').appendChild(app.canvas);
	
	inputBrightness.addEventListener('input', () => app
		.setBrightness(Number.parseFloat(inputBrightness.value)));
	inputContrast.addEventListener('input', () => app
		.setContrast(Number.parseFloat(inputContrast.value)));
	inputExposure.addEventListener('input', () => app
		.setExposure(Number.parseFloat(inputExposure.value)));
	inputSaturation.addEventListener('input', () => app
		.setSaturation(Number.parseFloat(inputSaturation.value)));

	inputImage.addEventListener('change', async (event) => {
		if (event.target.files.length > 0) {
			const image = await ImageLoader.loadFromFile(event.target.files[0]);

			app.setImage(image);
		}
	});
})();