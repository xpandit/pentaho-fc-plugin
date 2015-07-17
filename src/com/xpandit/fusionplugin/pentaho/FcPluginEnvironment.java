package com.xpandit.fusionplugin.pentaho;

import pt.webdetails.cpf.PentahoPluginEnvironment;
import pt.webdetails.cpf.PluginEnvironment;

/**
 * Created by dgpd on 17/07/2015.
 *
 * FusionPlugin CPF Environment
 *
 */
public class FcPluginEnvironment extends PentahoPluginEnvironment {

    private static FcPluginEnvironment instance = new FcPluginEnvironment();

    private FcPluginEnvironment() {  }

    public static void init() {
        PluginEnvironment.init( instance );
    }

    public static FcPluginEnvironment getInstance() {
        return instance;
    }

    public String getPluginId() {
        return "xfusion";
    }

}