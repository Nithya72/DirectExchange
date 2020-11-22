package edu.sjsu.cmpe275.aspect;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * AOP reference - https://www.youtube.com/watch?v=RVvKPP5HyaA&ab_channel=JavaTechie
 */

@Aspect
@Component
public class LoggingAdvice{

    Logger log = LoggerFactory.getLogger(LoggingAdvice.class);

    @Pointcut(value = "execution(* edu.sjsu.cmpe275.*.*.*(..))")
    public void myPointcut(){

    }

    @Around("myPointcut()")
    public Object appLogger(ProceedingJoinPoint pjp) throws Throwable {

        ObjectMapper mapper = new ObjectMapper();
        String methodName = pjp.getSignature().getName();
        String className = pjp.getTarget().getClass().getName();
        Object[] args = pjp.getArgs();
        log.info("Method invoked: "+methodName+" of Class: "+className+"-- Arguments: "+mapper.writeValueAsString(args));
        Object object = pjp.proceed();
        log.info("Method invoked: "+methodName+" of Class: "+className+"-- Repsonse: "+mapper.writeValueAsString(object));
        return object;
    }
}