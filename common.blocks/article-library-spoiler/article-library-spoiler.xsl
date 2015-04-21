<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

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

</xsl:stylesheet>
