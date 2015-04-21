<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="article-library-title">
	<div class="article-library-title">
		<h4 class="article-library-title__text {@class}"><xsl:value-of select="."/></h4>
	</div>
</xsl:template>

</xsl:stylesheet>