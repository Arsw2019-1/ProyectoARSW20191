package edu.eci.arsw.cartmode;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
/**
 * 
 * @param config Parametro de configuracion del web Scoket.
 */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {        
        config.enableStompBrokerRelay("/topic").setRelayHost("192.168.1.9").setRelayPort(61613);
        config.setApplicationDestinationPrefixes("/app");
    }
/**
 * 
 * @param registry Parametro de configuracioin del stomEndponit.
 */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/stompendpoint").setAllowedOrigins("*").withSockJS();
        
    }

}