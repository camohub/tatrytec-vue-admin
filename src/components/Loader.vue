<template>
    <div class="lds-ring">
        <div></div><div></div><div></div><div></div>
    </div>
</template>


<script>

export default {
    name: 'Loader',

	data() {
    	return {

		}
	}
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@import '@/assets/variables.scss';

.item {
    xflex-grow: 1;
    flex-basis: 25%;
    margin: 7px;
    padding: 14px;
    background-color: #aff;
}

.lds-ring {
    color: #41b883;
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -25px;
    margin-left: -25px;
    width: 50px;
    height: 50px;
}
.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 50px;
    height: 50px;
    margin: 8px;
    border: 15px solid #41b883;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.2, 0, 0.1, 1) infinite;
    border-color: #41b883 transparent transparent transparent;
	box-shadow: 0 0 2px #41b883;
}
.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}
@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
