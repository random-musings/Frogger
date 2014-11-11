//crates an index and loads an image for use by the canvas/context

var GameImage = function(index,src)
{
	this.index = index;
	this.img = new Image();
	this.img.src = src;
}