package edu.eci.arsw.cartmode;



import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/gs-guide-websocket").withSockJS();
        registry.addEndpoint("/gs-carta").withSockJS();
    }

//    public void registerStompEndpointsSala(StompEndpointRegistry registry) {
  //      registry.addEndpoint("/gs-sala").withSockJS();
    //}
    /**
    public void registroCambioCarta(StompEndpointRegistry registry) {
        registry.addEndpoint("/gs-carta").withSockJS();
    
    }*/
}