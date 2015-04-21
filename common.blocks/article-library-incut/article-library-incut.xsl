<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">


<xsl:template match="article-library-incut">
	<div class="article-library-incut {@class}">
		<xsl:value-of select="article-library-incut__content"/>
		<xls:if test="contains(@class, 'article-library-title_theme_red')"><xsl:apply-templates select="article-library-incut__subtitle"/></xsl:if>
	</div>
</xsl:template>

<xsl:template match="article-library-incut__subtitle">
	<div class="article-library-incut__subtitle"><xsl:apply-templates /></div>
</xsl:template>


</xsl:stylesheet>