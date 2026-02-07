<script lang="ts">
	interface Props {
		title: string;
		value: string;
		description?: string;
		variant?: 'primary' | 'danger' | 'success' | 'neutral';
	}

	let { title, value, description, variant = 'neutral' }: Props = $props();

	const variantClasses = {
		primary: 'bg-primary-50 border-primary-200 text-primary-900',
		danger: 'bg-danger-50 border-danger-200 text-danger-900',
		success: 'bg-success-50 border-success-200 text-success-900',
		neutral: 'bg-gray-50 border-gray-200 text-gray-900'
	};

	const valueClasses = {
		primary: 'text-primary-600',
		danger: 'text-danger-600',
		success: 'text-success-600',
		neutral: 'text-gray-700'
	};
</script>

<div class="rounded-lg border-2 p-6 {variantClasses[variant]}">
	<h3 class="text-sm font-semibold uppercase tracking-wide mb-2">{title}</h3>
	<p class="text-3xl font-bold mb-1 {valueClasses[variant]}">{value}</p>
	{#if description}
		<p class="text-sm opacity-75">{description}</p>
	{/if}
</div>
