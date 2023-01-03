<script lang="ts">
	import { onMount } from 'svelte';

	// kindly inspired from https://htmldom.dev/drag-to-scroll/
	let pos = {
		top: 0,
		left: 0,
		x: 0,
		y: 0
	};

	let spanEl: HTMLSpanElement;

	const handleMouseDown = (evt: MouseEvent) => {
		pos = {
			left: spanEl.scrollLeft,
			top: spanEl.scrollTop,
			x: evt.clientX,
			y: evt.clientY
		};

		spanEl.style.cursor = 'grabbing';
		spanEl.style.userSelect = 'none';

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	const handleMouseUp = () => {
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);

		spanEl.style.cursor = 'grab';
		spanEl.style.removeProperty('user-select');
	};

	const handleMouseMove = (evt: MouseEvent) => {
		const dx = evt.clientX - pos.x;
		const dy = evt.clientY - pos.y;

		spanEl.scrollTop = pos.top - dy;
		spanEl.scrollLeft = pos.left - dx;
	};

	const handleWheel = (evt: WheelEvent) => {
		const diff = evt.deltaY || evt.deltaX;

		spanEl.scrollLeft += diff * 0.5;
	};

	const stopPropogation = (evt: MouseEvent) => {
		if (evt.clientX != pos.x || evt.clientY != pos.y) evt.stopPropagation();
	};

	onMount(() => {
		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span
	class="py-2 mt-2 flex flex-row flex-nowrap space-x-4 md:overflow-x-hidden overflow-x-auto cursor-grab touch-pan-x"
	bind:this={spanEl}
	on:mousedown={handleMouseDown}
	on:click={stopPropogation}
	on:wheel|nonpassive|preventDefault={handleWheel}
>
	<slot />
</span>
