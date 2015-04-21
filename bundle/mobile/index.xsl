<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">


<xsl:template match="article-library-foto">
	<div class="article-library-foto"><xsl:apply-templates/></div>
</xsl:template>






<xsl:template match="article-library-authors">
	<div class="article-library-authors"><xsl:apply-templates/></div>
</xsl:template>






<xsl:template match="article-library-incut">
	<div class="article-library-incut {@class}">
		<xsl:value-of select="article-library-incut__content"/>
		<xls:if test="contains(@class, &apos;article-library-title_theme_red&apos;)"><xsl:apply-templates select="article-library-incut__subtitle"/>
	</xls:if></div>
</xsl:template>

<xsl:template match="article-library-incut__subtitle">
	<div class="article-library-incut__subtitle"><xsl:apply-templates/></div>
</xsl:template>






<xsl:template match="article-library-separator">
	<div class="article-library-separator {@class}"/>
</xsl:template>





<xsl:template match="article-library-spoiler">
    <div class="article-library-spoiler {@class}">
        <div class="article-library-spoiler__button">
            <xsl:value-of select="article-library-spoiler__button"/>
        </div>
        <div class="article-library-spoiler__content">
            <xsl:apply-templates select="article-library-spoiler__content"/>
        </div>
    </div>
</xsl:template>




<xsl:template match="article-library-title">
	<div class="article-library-title">
		<h4 class="article-library-title__text {@class}"><xsl:value-of select="."/></h4>
	</div>
</xsl:template>





<xsl:template match="article-library-twitter-link">
	<div class="article-library-twitter-link"><xsl:apply-templates/></div>
</xsl:template>






<xsl:template match="article-library-wide-acticle-text">
	<div class="article-library-wide-acticle-text"><xsl:apply-templates/></div>
</xsl:template>






<xsl:template match="article-library-wide-acticle-title">
	<div class="article-library-wide-acticle-title"><xsl:apply-templates/></div>
</xsl:template>


</xsl:stylesheet>